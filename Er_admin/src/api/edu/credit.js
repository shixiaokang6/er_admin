import request from '@/utils/request'


export default{

    //讲师审核列表（条件查询分页）
    // current当前页    limit每页记录数     teacherQuery条件对象
    getCreditListPage(curent,limit,creditQuery){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-credit/findAllOrder/${curent}/${limit}`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
            data:creditQuery
          })
    },

}

