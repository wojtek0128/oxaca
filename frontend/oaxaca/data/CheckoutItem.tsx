import React from "react";

/**
 * Object for checkout items containing menu item ID, name, quantity and price.
 */
class CheckoutItem {
    private _id: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    /**
     * Constructor for CheckoutItem
     * @param id String item ID (same as menuID).
     * @param name String name (same as pname).
     * @param quantity Quantity of item requested.
     * @param price Price of each item, not affected by quantity, in pennies.
     */
    constructor(id: string, name: string, quantity: number, price: number) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._price = price;
    }

    /**
     * Getters for ID, name, quantity and price.
     */
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get quantity(): number {
        return this._quantity;
    }
    get price(): number {
        return this._price;
    }

    /**
     * Setter for ID.
     * @param newID New item ID.
     */
    set id(newID: string) {
        this._id = newID;
    }

    /**
     * Setter for item name.
     * @param newName new item name.
     */
    set name(newName: string) {
        this._name = newName;
    }

    /**
     * Setter for item quantity.
     * @param newQuantity Number of items requested, must be a positive integer.
     */
    set quantity(newQuantity: number) {
        console.log(newQuantity);
        if (!(newQuantity >= 0 && Number.isInteger(newQuantity))) {
            throw new Error("Quantity must be more than 0 and an Integer");
        }
        this._quantity = newQuantity;
    }

    /**
     * Setter for item price (not affected by quanity - individual item price only).
     * @param newPrice Price of each individual item in pennies.
     */
    set price(newPrice: number) {
        if (!(newPrice >= 0 && Number.isInteger(newPrice))) {
            throw new Error("Price must be more than 0 and in pennies (Integer)");
        }
        this._price = newPrice;
    }

}

export default CheckoutItem;