export class User {
    private static userList: { id: string; name: string }[] = [];
  
    private constructor() {}
  
    public static getUserList() {
      return this.userList;
    }
  
    public static addUser(user: any) {
      const added = this.userList.find((currentUser) => currentUser.id == user.id);
      if (added) {
        return;
      }
      this.userList.push(user);
    }
  
    public static removeUser(id: any) {
      if (this.userList) {
        this.userList = this.userList.filter((user) => user.id != id);
      }
    }
  }