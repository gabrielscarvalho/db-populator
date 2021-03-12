import _ from 'lodash';
import { iMap } from '../../interfaces';
import { Optional } from './optional';


export class NamedMap<T> implements iMap<T> {
  
  private data: Map<string, T>;

  public constructor(){
    this.data = new Map<string, T>();
  }


  public has(name: string): boolean {
    return this.data.has(name);
  }

  public add(name: string, content: T, config: { throwIfExists: boolean } = { throwIfExists : false }): iMap<T> {
    if (this.has(name) && config.throwIfExists) {
      throw new Error(`Cannot add ${name} to list. The value is already in use.`);
    }
    this.data.set(name, content);
    return this;
  }

  public get(name: string, config: { throwIfNotExists: boolean } = { throwIfNotExists : false } ): Optional<T> {
    if (!this.has(name)) {
      if(config.throwIfNotExists) {
        const validKeys: string = this.getKeys().join(',');
        throw new Error(`Could not get unknown '${name}' from list.  Did you spell it right? Valid values: [${validKeys}]`);
      }
      return Optional.fromNullable<T>();
    }
    return Optional.fromValue(this.data.get(name));
  }

  public delete(name: string, config: { throwIfNotExists: boolean } = { throwIfNotExists : false }): boolean {
    if(!this.has(name)) {
      if(config.throwIfNotExists) {
        const validKeys: string = this.getKeys().join(',');
        throw new Error(`Could not delete unknown '${name}' from list. Did you spell it right? Valid values: [${validKeys}]`);
      }
      return false;
    }
    this.delete(name);
    return true;
  }  


  public getKeys() : string[] {
    const names: string[] = [];

    this.data.forEach((val, name) => {
        names.push(name);
    });

    return names;
  }

  public getValues(): T[] {
    const values: T[] = [];

    this.data.forEach((val) => {
        values.push(val);
    });

    return values;
  }

  public find(filter: any): Optional<T> {
    const x : T = _.find<T>(this.getValues(), filter);
    return Optional.fromValue(x);
  }   
}