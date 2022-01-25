export const MIN_USERS_NUMBER = 3;

export const MAX_USERS_NUMBER = 500;

export const MIN_WISHES_NUMBER = 1;

export const MAX_WISHES_NUMBER = 10;


export function InvalidIdException(){
    this.status = 400;
    this.message = 'Invalid ID';
  }
  
export function UserNotFoundException() {
    this.status = 404;
    this.message = 'User not found';
  }