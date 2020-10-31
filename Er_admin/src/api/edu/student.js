import request from '@/utils/request'


export default{
    //学生列表（条件查询分页）
    // current当前页    limit每页记录数     teacherQuery条件对象
    getStudentListPage(current,limit,studentQuery){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-personinfo/studentPageCondition/${current}/${limit}`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
            data: studentQuery
          })
    },
    // 删除用户
    deleteStudentId(id){
        return request({
            url: `/zhaojiajiaoservice/er-personinfo/${id}`,
            method: 'delete'
        })
    },
    //添加用户
    addStudent(user){
        return request({
            url: `/zhaojiajiaoservice/er-personinfo/insertUser`,
            method: 'post',
            data:user
        })
    },
    // 根据id查询用户
    getStudentInfo(id){
        return request({
            url: `/zhaojiajiaoservice/er-personinfo/getStudent/${id}`,
            method: 'get'
        })
    },
    // // 修改用户
    updateStudentInfo(user){
        return request({
            url: `/zhaojiajiaoservice/er-personinfo/updateStudent`,
            method: 'post',
            data:user
        })    
    }

}

