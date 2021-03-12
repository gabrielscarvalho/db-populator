


export class Optional<T> {

  protected data: T = null;
  protected hasChecked: boolean = false;


  public constructor(value: T = null) {
    this.data = value;
  }

  public set(value: T): void {
    this.data = value;
  }

  public static fromNullable<T>() {
    return new Optional<T>()
  }

  public static fromValue<T>(value: T) {
    return new Optional<T>(value)
  }

  public isPresent(): boolean {
    this.hasChecked = true;
    return !!this.data;
  }

  public get(config: { skipValidation: boolean } = { skipValidation: false }): T {
    if (!config.skipValidation && !this.hasChecked) {
      throw new Error('It is required to check if value is present before getting it. Call isPresent() before.');
    }
    return this.data;
  }
}