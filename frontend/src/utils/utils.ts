export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }


 export function generateSlug(title:string) {
    return title.toLowerCase().replace(/ /g, '-');
  }
  
  