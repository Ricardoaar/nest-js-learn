import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users = [];

  constructor() {
    this.users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      { id: 3, name: 'Jane' },
      { id: 4, name: 'Jack' },
    ];
  }


  getAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(item => item.id === id);
  }

  create(payload) {
    const newUser = {
      id: this.users.length + 1,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload) {
    const index = this.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...payload,
    };

    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this.users.splice(index, 1);

    return true;
  }
}