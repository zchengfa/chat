import { create } from "zustand";

export const useMessageStore = create((set)=>{
    return {
        message:0,
        changeMsg:()=>{
           set((state:any)=>{
                return {
                    message:state.message + 1
                }
            })
        },
        reduceMsg:()=> set((state:any)=> ({message:state.message - 1}))

    }
})