

export default function filename() {
    const getDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
      };
    
      const fileName = `${getDate()}-courses.json`;
      return fileName
}