const AdminJS = require("adminjs");

const Address = require("../models/address");
const Category = require("../models/category");
const Film = require("../models/film");
const Order = require("../models/order");
const Review = require("../models/review");
const Product = require("../models/product");
const User = require("../models/user");
import { People, Image, Genre } from "../models/extras";

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require("./hooks/upload-image");

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
          id: {
            isVisible: false,
          },
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
          id: {
            isVisible: false,
          },
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
          id: {
            isVisible: false,
          },
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
          id: {
            isVisible: false,
          },
          source: {
            isVisible: false,
          },
          uploadImage: {
            components: {
              show: AdminJS.bundle("./components/upload-image.show.js"),
              edit: AdminJS.bundle("./components/upload-image.edit.js"),
              list: AdminJS.bundle("./components/upload-image.list.js"),
            },
          },
          updatedAt: {
            isVisible: false,
          },
        },
        actions: {
          new: {
            after: async (response: any, request: any, context: any) => {
              return uploadAfterHook(response, request, context);
            },
            before: async (request: any, context: any) => {
              return uploadBeforeHook(request, context);
            },
          },
          edit: {
            after: async (response: any, request: any, context: any) => {
              return uploadAfterHook(response, request, context);
            },
            before: async (request: any, context: any) => {
              return uploadBeforeHook(request, context);
            },
          },
          show: {
            isVisible: false,
          },
        },
      },
    },
    {
      resource: Product,
      options: {
        parent: productParent,
        listProperties: ["name", "category", "price"],
        properties: {
          id: {
            isVisible: false,
          },
          images: {
            // components: {
            //   list: AdminJS.bundle("./components/image.list.js"),
            //   show: AdminJS.bundle("./components/image.list.js"),
            // },
          },
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
        "Film.videoLink": "Video ID",
        "Film.trailerLink": "Trailer Video ID",
        Category: "Categories",
        Address: "Addresses",
        Order: "Orders",
        Product: "Products",
        "Product.images": "Product Images",
        User: "Users",
        Review: "Reviews",
        People: "People",
        Image: "Images",
        Genre: "Genres",
      },
    },
  },
};
