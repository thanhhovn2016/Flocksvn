import DOMPurify from 'isomorphic-dompurify';

export const groupBy = (arrayOfObject, property) => {
    return arrayOfObject?.reduce((acc, obj) => {
        const key = obj[property];
        if(!acc[key]){
            acc[key] = [];
        }
        acc[key].push(obj);
        
        return acc;
    }, {})
}

export const getLanguage = () => {
    const splitPathName = typeof window !== "undefined" && window?.location?.pathname?.split("/");
    const lang = splitPathName[1] == "en" ? "en" : "vi";

    return lang;
}

export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

 export const dataURLtoFile = (dataurl, filename="liveness_img.jpeg") => {
 
    var arr = dataurl.split(','),
    //@ts-ignore
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const getUrlAfterLogin = (userType, locale) => {
    const localeUrl = locale === "en" ? "/" : "/";
    if(userType != null){
        return `${localeUrl}${userType}/`
    }else{
        return `${localeUrl}`;
    }

}

export const renderRawHTML = (content) => {
    const cleanHTML = DOMPurify.sanitize(content, {
        USE_PROFILES: {html: true}
    });

    return <div dangerouslySetInnerHTML={{__html: cleanHTML}}/>
}

// ################ Date Formating ####################
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

export const formatedDate = (date) => {
    const dateObj = new Date(date);
    const monthIndex = dateObj.getMonth();
    const monthName = months[monthIndex];
    const monthDay = dateObj.getDay();
    const fullYear = dateObj.getFullYear();

    return `${monthName} ${monthDay}, ${fullYear}`;
}

export const getMonthName = (date) => {
    const dateObj = new Date(date);
    const monthIndex = dateObj.getMonth();
    const monthName = months[monthIndex];
    return monthName;
}

export const getMonthDay = (date) => {
    const dateObj = new Date(date);
    const monthDay = dateObj.getDay();
    return monthDay;
}

export const getTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString('en-US', {hour:'numeric', minut:'numeric', hour12:true});

    return time;
}