export default interface IPermission {
  allow(can: Function): void;
  disallow(cannot: Function): void;
  description: string;
}
