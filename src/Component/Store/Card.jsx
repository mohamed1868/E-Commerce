import { createSlice } from "@reduxjs/toolkit";



let initialState = {
    items: [],     

  };


  export const IcardStore = createSlice({
    name: "Card",
    initialState,
    reducers: {
      addToCard: (state, action) => {
        const productId = action.payload.id; 
        const existingProduct = state.items.find(item => item.id === productId); 

        if (existingProduct) {
   
          existingProduct.numbers++;

        } else {

          state.items.push({ id: productId, numbers: 1 , price: action.payload.price , title : action.payload.title , img : action.payload.img , mix : action.payload.max});
        }

      },

     removeToCard : (state , action)=>{
      const productId = action.payload; 
       state.items = state.items.filter((ele) => ele.id != productId);

     },
     updateToNumbers : (state , action)=>{
      const productId = action.payload.ids; 
      const existingProduct = state.items.find(item => item.id === productId); 

      if (existingProduct) {
 
        existingProduct.numbers = parseInt( action.payload.value) ;


      }
     }
    },
  });





export let {addToCard , removeToCard ,updateToNumbers } = IcardStore.actions
let IcardStores = IcardStore.reducer
export default IcardStores