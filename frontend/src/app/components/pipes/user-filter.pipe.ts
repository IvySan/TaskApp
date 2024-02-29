import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }

    searchTerm = searchTerm.toLowerCase();

    return users.filter(user => {
      const fullname = `${user.firstname} ${user.lastname}`.toLowerCase();
      return fullname.includes(searchTerm);
    });
  }

}
