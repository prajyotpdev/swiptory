class CartItemModel {
     constructor(
       itemId,
       quantity,
       colour,
     ) {
       this.itemId = itemId;
       this.quantity = quantity;
       this.colour = colour;
     }
   
     static fromMap(data) {
       return new CartItemModel(
         data.itemId,
         data.quantity,
         data.colour,
       );
     }
     
     toJSON() {
       return {
          itemId: this.itemId,
          quantity: this.quantity,
          colour: this.colour,
       };
     }
   }
   