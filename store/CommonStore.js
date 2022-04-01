import { Store } from 'pullstate';

export const CommonStore = new Store({

    isLoggedIn: false,
    userID: '',
    userDetails: [],
    userSelected: {},

    serviceList: [],
    sellerServiceList: [],
    serviceCategorySelected: [],
    serviceSelected: {},

    customerOrder: [],
    selectedCustomerOrder: [],

});