import PermissionFlagsBits from './PermissionFlagsBits';

type BitFieldResolvable = bigint | PermissionsBitField | BitFieldResolvable[];

export default class PermissionsBitField {
  private bitfield: bigint;

  constructor(bits: BitFieldResolvable = 0n) {
    this.bitfield = PermissionsBitField.resolve(bits);
  }

  add(...bits: bigint[]): PermissionsBitField {
    this.bitfield = bits.reduce((acc, bit) => acc | bit, this.bitfield);

    return this;
  }

  remove(...bits: bigint[]): PermissionsBitField {
    this.bitfield = bits.reduce((acc, bit) => acc & ~bit, this.bitfield);

    return this;
  }

  equals(bits: BitFieldResolvable): boolean {
    const bitfield = PermissionsBitField.resolve(bits);

    return this.bitfield === bitfield;
  }

  any(bits: BitFieldResolvable): boolean {
    const bitfield = PermissionsBitField.resolve(bits);

    return (this.bitfield & bitfield) !== 0n;
  }

  has(bits: BitFieldResolvable): boolean {
    const bitfield = PermissionsBitField.resolve(bits);

    return (this.bitfield & bitfield) === bitfield;
  }

  toArray(): string[] {
    return Object.keys(PermissionFlagsBits).filter(
      (flag) => (this.bitfield & PermissionFlagsBits[flag]) !== 0n,
    );
  }

  valueOf() {
    return this.bitfield;
  }

  static Flags = PermissionFlagsBits;

  static Default =
    PermissionFlagsBits.ViewCategories | PermissionFlagsBits.ViewProducts;

  static All = Object.values(PermissionFlagsBits).reduce(
    (acc, bit) => acc | bit,
    0n,
  );

  static resolve(bits: BitFieldResolvable): bigint {
    if (typeof bits === 'bigint') return bits;
    else if (bits instanceof PermissionsBitField) return bits.bitfield;
    else if (Array.isArray(bits)) {
      return bits
        .map((bit) => this.resolve(bit))
        .reduce((acc, bit) => acc | bit, 0n);
    } else return 0n;
  }
}

export const Roles = {
  Guest: new PermissionsBitField(PermissionsBitField.Default),
  User: new PermissionsBitField([
    PermissionFlagsBits.ViewCategories,
    PermissionFlagsBits.ViewOrders,
    PermissionFlagsBits.CreateOrders,
    PermissionFlagsBits.ViewProducts,
    PermissionFlagsBits.UploadFiles,
  ]),
  Admin: new PermissionsBitField(PermissionsBitField.All),
};
