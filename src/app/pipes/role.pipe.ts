import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'ROLE_OWNER':
        return 'Owner';
      case 'ROLE_USER':
        return 'Member';
      default:
        return 'Member';
    }
  }

}
