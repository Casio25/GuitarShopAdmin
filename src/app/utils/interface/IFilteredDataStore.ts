export interface IFilteredDataStore {
    initialData: YourOfferType[];
    currentProductList: YourOfferType[]; 
    skip: number;
    take: number;

    typeChecked: {
        ukulele: boolean;
        electro: boolean;
        acustic: boolean;
    };
    filterArray: {
        type: string[];
        string: string[];
        price: {
            minPrice?: number; 
            maxPrice?: number; 
        };
    };
}

// Assuming YourOfferType is a type representing the structure of elements in the 'offers' array
type YourOfferType = {
    // Define the properties of YourOfferType here
};