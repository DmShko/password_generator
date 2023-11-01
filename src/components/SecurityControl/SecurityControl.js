
export const SecurityControl = (data) => {

    let level = 0;
  
    if(data.find(element => '0123456789'.includes(element)))
    {
        
        level += 1;
    }

    if(data.find(element => '!@#$%^&*(){}[]<>/.,:"'.includes(element)))
    {
        
        level += 1;
    }

    if(data.filter(element => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(element)).find(element => element === element.toUpperCase()))
    {
       
        level += 1;
    }
    
    if(level === 3) {
       return 'green'; 
    } else {
        return 'orange';
    }
    
  
}
