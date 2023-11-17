import { observable } from "mobx";


const ChangeProductStore = observable({
    id: null,
    authorId: null,
    productName: "",
    photo: "",
    price: null,
    type: "",
    string: "",


    setProduct(product) {
        this.id = product.id
        this.authorId = product.authorId
        this.productName = product.productName
        this.photo = product.photo
        this.price = product.price
        this.type = product.type
        this.string = product.string
    },

})





export default ChangeProductStore;