import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const createdDate = new Date(value).getTime();
    const now = new Date().getTime();
    const diffDate = now - createdDate;

    const years = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30 * 12));
    const months = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diffDate / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffDate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(diffDate % (1000 * 60 * 60) / (1000 * 60));

    let timeAgo = ''

    if (years > 0) {
      timeAgo = years > 1 ? `${years} years ago` : `${years} year ago`;

    } else if (months > 0) {
      timeAgo = months > 1 ? `${months} months ago` : `${months} month ago`;

    } else if (days > 0) {
      timeAgo = days > 1 ? `${days} days ago` : `${days} day ago`;

    } else if (hours > 0) {
      timeAgo = hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;

    } else if (minutes > 0) {
      timeAgo = minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;

    }

    return timeAgo;

  }

}
