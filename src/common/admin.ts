const Address = require("../models/address");
const Category = require("../models/category");
const Film = require("../models/film");
const Order = require("../models/order");
const Review = require("../models/review");
const Product = require("../models/product");
const User = require("../models/user");
import { People, Image, Genre } from "../models/extras";

// icons https://www.carbondesignsystem.com/guidelines/icons/library/
const accountParent = {
  name: "Account",
  icon: "User",
};

const orderParent = {
  name: "Order",
  icon: "DeliveryParcel",
  // icon: "Add24",
};

const productParent = {
  name: "Product",
  icon: "ModelAlt",
};

const mediaParent = {
  name: "Media",
  icon: "MediaLibrary",
};

// https://docs.adminjs.co/AdminJSOptions.html
export const adminOptions = {
  databases: [],
  rootPath: "/admin",
  resources: [
    { resource: User, options: { parent: accountParent } },
    {
      resource: Genre,
      options: {
        parent: mediaParent,
        properties: {
          updatedAt: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    { resource: Film, options: { parent: mediaParent } },
    {
      resource: People,
      options: {
        parent: mediaParent,
        properties: {
          updatedAt: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    {
      resource: Category,
      options: {
        parent: productParent,
        properties: {
          createdAt: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    {
      resource: Address,
      options: {
        parent: orderParent,
        properties: {
          createdAt: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    { resource: Order, options: { parent: orderParent } },
    {
      resource: Image,
      options: {
        parent: productParent,
        properties: {
          source: {
            type: "richtext",
            custom: {
              modules: {
                toolbar: [["link", "image"]],
              },
            },
          },
          updatedAt: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    {
      resource: Product,
      options: {
        parent: productParent,
        properties: {
          description: {
            type: "richtext",
            custom: {
              // some custom options
            },
          },
        },
      },
    },
    { resource: Review, options: { parent: productParent } },
  ],
  branding: {
    companyName: "Leo Films Admin",
  },
  locale: {
    translations: {
      labels: {
        Film: "Movies",
        Category: "Categories",
        Address: "Addresses",
        Order: "Orders",
        Product: "Products",
        User: "Users",
        Review: "Reviews",
        People: "People",
        Image: "Images",
        Genre: "Genres",
      },
    },
  },
};
