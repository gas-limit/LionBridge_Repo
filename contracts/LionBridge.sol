// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./AxelarExecutable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LP_Token.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title LionBridge
 * @author xdream.eth
 * @notice A program that bridges tokens from one EVM chain to another EVM chain, allowing users to swap tokens
 * and liquidity providers to earn a fee.
 * @dev This contract is built on the Axelar network and uses OpenZeppelin & Solmate libraries for ERC20 and LP token functionality.
 */

contract LionBridge is AxelarExecutable {

    //array of tokens that can be bridged
    address[] public tokens;
    //check if an LP token exists using a mapping from address to bool
    mapping(address => bool) public LP_Tokens_Existing;
    //mapping of LP tokens to their respective token
    mapping(address => address) public LP_Tokens;
    
    //this contract to destination chain contract
    mapping(address => address) public destinationContracts;

    /**
     * @dev Struct for the transfer message.
     */
    struct transferMessage {
        /// @notice The address of the token to be transferred.
        address token;
        uint256 amount;
        address recipient;
    }

    

    constructor(address gateway) AxelarExecutable(gateway) {}

    /**
     * @dev Deposits tokens into the contract and mints LP tokens.
     * If the token already exists in the liquidity pool, the tokens are added to the existing pool.
     * If not, a new liquidity pool is created for the token and the LP tokens are minted.
     * @param token The address of the token to be added to the liquidity pool.
     * @param amount The amount of tokens to be deposited.
     * @notice The LP token name is set as "LionBridge LP" and the symbol is set as "LION_LP".
     * @notice If the underlying asset does not implement the `symbol()` function, a unique symbol may not be created.
     * @notice The decimal places for the LP token is set to 18.
     * @notice LP tokens are minted and transferred to the caller.
     */

    function addLiquidity(address token, uint256 amount) external {

        //check if token exists, then add liquidity
        bool tokenExists = LP_Tokens_Existing[token];
        if (tokenExists) {
            IERC20(token).transferFrom(msg.sender, address(this), amount);
            //get LP Token Address
            address lpToken = LP_Tokens[token];
            //LP Token instance
            ILP_Token lp = ILP_Token(lpToken);

            //mint LP tokens
            (lp).mintLP(msg.sender, amount);

        }
        else {
            //add token to array
            tokens.push(token);
            //add token to mapping
            LP_Tokens_Existing[token] = true;
            //transfer tokens to contract
            IERC20(token).transferFrom(msg.sender, address(this), amount);

 /**
  * @notice I want to use the symbol of the underlying asset to create a name for the LP token,
  * but I can't because not all tokens implement symbol().
  * We may be able to rename if we use an external source to get the symbol of the token like coingecko
  */
            LP_Token lp = new LP_Token("LionBridge LP", "LION_LP", 18, address(this));

            //add LP token to mapping
            LP_Tokens[address(lp)] = token;
            
        }
        
    }

    /**
     * @dev Remove liquidity from the specified LP token by burning the corresponding LP tokens and transferring
     * the underlying asset back to the user.
     * 
     * @param LPtoken The address of the LP token to remove liquidity from.
     * @param amount The amount of LP tokens to burn and the corresponding underlying asset to transfer.
     * 
     * Requirements:
     * - The LP token must exist.
     * - The user must have sufficient LP tokens to burn.
     * 
     * Effects:
     * - Burns the specified amount of LP tokens from the user's account.
     * - Transfers the corresponding amount of underlying asset to the user.
     */

    function removeLiquidty(address LPtoken, uint256 amount) external {

        //burn LP tokens
        ILP_Token(LPtoken).burnLP(msg.sender, amount);

        // get underlying address of LP token
        address token = LP_Tokens[LPtoken];
    
        //approve token transfer
        IERC20(token).approve(msg.sender, amount);
        IERC20(token).transfer(msg.sender, amount);
    }

/**
 * @dev Bridge tokens across chains using Axelar.
 * @param token The address of the token being bridged.
 * @param amount The amount of tokens being bridged.
 * param destinationChain The name of the destination chain.
 * param destinationAddress The address on the destination chain where the tokens will be sent.
 * @notice This function allows users to bridge tokens from one EVM chain to another using Axelar. The tokens will be transferred from the user's account to this contract, and then bridged to the specified destination chain. The `destinationChain` parameter should be the name of the chain the user wants to bridge to (e.g., "Avalanche", "Binance Smart Chain", etc.), and the `destinationAddress` parameter should be the address on the destination chain where the tokens will be sent. The function will call the `callContract` function on the Axelar gateway contract to initiate the token bridge. The `require` statement checks if the token being bridged exists in the contract. If it does not exist, the transaction will fail.
 */

    //bridge tokens across chains using Axelar
    function bridgeTokens(address token, uint256 amount/*, string memory destinationChain, string memory destinationAddress*/) external {

        //check if token exists
        require(LP_Tokens_Existing[token]);
        //transfer tokens to contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        //convert destinationContracts[address(this)] to string
        string memory destAddressString = Strings.toHexString(destinationContracts[address(this)]);

        //instantiate transferMessage struct
        transferMessage memory message = transferMessage(token, amount, msg.sender);

        //bridge tokens     
        gateway.callContract(
            "Avalanche",
            destAddressString,
            abi.encode(message)
        );
        
    }

/**
 * @notice Sends underlying tokens to a specified recipient on this chain, after receiving a message from a destination chain.
 * @param _tokenAddress The address of the token to send.
 * @param amount The amount of tokens to send.
 * @param recipient The address of the recipient to send the tokens to.
 * @dev This function should only be called internally as part of the execution of a cross-chain transfer. It checks that this contract has enough tokens to send, and then transfers them to the specified recipient. If there are not enough tokens, it reverts with an error message.
 */
    function sendUnderlying(address _tokenAddress, uint amount,address recipient) internal {

        //check if this contract has enough tokens to send
        require(IERC20(_tokenAddress).balanceOf(address(this)) >= amount, "Not enough liquidity to send");
        //transfer tokens to user
        IERC20(_tokenAddress).transfer(recipient, amount);

        
    }

/**
 * @dev Internal function to execute a given call data.
 * @param payload The encoded call data to execute.
 */

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override {
        //decode bytes calldata to tranferMessage struct
        transferMessage memory message = abi.decode(payload, (transferMessage));
        address token = message.token;
        uint256 amount = message.amount;
        address recipient = message.recipient;

        sendUnderlying(token, amount, recipient);


    }


    
}

interface ILP_Token {
    function mintLP(address account, uint256 amount) external;

    function burnLP(address account, uint256 amount) external;
}
