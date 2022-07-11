// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";


contract NFTMarketplace is ERC721URIStorage {

    /* STATE VARIABLES */
    using Counters for Counters.Counter;     
    Counters.Counter private _tokenIds;    // counts number of tokens minted so far
    uint256 listingPrice = 0.1 ether;    // fixed listing price for minted tokens
    uint256 quantityLimit = 4;    // max qty of nfts that can exist in this collection
    mapping(uint256 => MarketItem) private idToMarketItem;    // maps user wallets to nfts
    struct MarketItem {    // struct that creates a MarketItem with the specified metadata
        uint256 tokenId;
        address payable previousOwner;
        address payable currentOwner;
        uint256 price;
    }


    /* EVENTS */
    event MarketItemCreated (
        uint256 indexed tokenId,
        address previousOwner,
        address currentOwner,
        uint256 price
    );


    /* CONSTRUCTORS */
    constructor() ERC721("Metakicks NFT", "METK") {}


    /* GETTERS & SETTERS */
    /* Returns the current number of NFTs minted for the contract. */
    function getNumberMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    /* Returns the listing price of the contract. */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Returns the max quantity of nfts that can be minted in this collection. */
    function getQtyLimit() public view returns (uint256) {
        return quantityLimit;
    }


    /* FUNCTIONS */
    /* createToken() */
    /* Mints a token and lists it in the marketplace. */
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {

        /* Check _tokenIds is under the limit, then increment. */
        require(_tokenIds.current() < quantityLimit, "Can't mint more tokens than presale allows");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        /* Initiate the minting process */
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    /* createMarketItem() */
    /* Creates a market item as part of the larger token creation process. */
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price.");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            tx.origin,
            msg.sender,
            price
        );
    }

    /* fetchMyNFTs() */
    /* Returns only items that a user has purchased. */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].currentOwner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].currentOwner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}

