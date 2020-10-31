import request from '@/utils/request'


export default{
    //订单列表（条件查询分页）
    // current当前页    limit每页记录数     teacherQuery条件对象
    findAllOrder(current,limit,orderQuery){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-teachingtask/findAllOrder/${current}/${limit}`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
            data:orderQuery
          })
    },
    // 删除订单
    // deleteOrderId(id){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-personinfo/${id}`,
    //         method: 'delete'
    //     })
    // },
    //添加订单
    // addOrder(order){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-personinfo/insertUser`,
    //         method: 'post',
    //         data:user
    //     })
    // },
    // 根据id查询订单
    getOrderInfo(id){
        return request({
            url: `/zhaojiajiaoservice/er-teachingtask/findTaskById/${id}`,
            method: 'get'
        })
    },
    // // 修改订单
    updateOrder(Order){
        return request({
            url: `/zhaojiajiaoservice/er-teachingtask/updateOrder`,
            method: 'post',
            data:Order
        })    
    }

}

