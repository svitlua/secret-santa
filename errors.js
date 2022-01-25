export function InvalidIdException(){
    this.status = 400;
    this.message = 'Invalid ID';
  }
  
export function UserNotFoundException() {
    this.status = 404;
    this.message = 'User not found';
}
