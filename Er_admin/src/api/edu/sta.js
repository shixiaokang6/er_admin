import request from '@/utils/request'


export default{

    getData(searchObj){
        return request({
            url: `/zhaojiajiaoservice/er-statistical/statistical/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }

   

}

