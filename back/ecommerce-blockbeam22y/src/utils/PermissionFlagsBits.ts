const PermissionFlagsBits = {
  ViewCategories: 1n << 0n,

  ManageCategories: 1n << 1n,

  ViewOrders: 1n << 2n,

  CreateOrders: 1n << 3n,

  ViewProducts: 1n << 4n,

  ManageProducts: 1n << 5n,

  ManageUsers: 1n << 6n,

  UploadFiles: 1n << 7n,
};

export default PermissionFlagsBits;
