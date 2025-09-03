import type { Product } from "./Product";

export interface Basket {
  basketId: string;
  items: BasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}

export class Item {
  public productId: number;
  public name: string;
  public price: number;
  public pictureUrl: string;
  public brand: string;
  public type: string;
  public quantity: number;
  public constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.brand;
    this.type = product.type;
    this.quantity = quantity;
  }
}
