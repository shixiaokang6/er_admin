import request from '@/utils/request'


export default{

    //讲师审核列表（条件查询分页）
    // current当前页    limit每页记录数     teacherQuery条件对象
    getCheckTeacherListPage(curent,limit,teacherQuery){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-caf/teacherCheckPageCondition/${curent}/${limit}`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
            data: teacherQuery
          })
    },

    // // 删除讲师
    // deleteTeacherId(id){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-caf/${id}`,
    //         method: 'delete'
    //     })
    // },
    //添加讲师
    // addTeacher(teacher){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-caf/addTeacher`,
    //         method: 'post',
    //         data: teacher
    //     })
    // },
    // getTeacherInfo(id){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-caf/getTeacher/${id}`,
    //         method: 'get'
    //     })
    // },
    // // // 修改讲师
    // updateTeacherInfo(teacher){
    //     return request({
    //         url: `/zhaojiajiaoservice/er-caf/updateTeacher`,
    //         method: 'post',
    //         data:teacher
    //     })    
    // },
    // 审核
    checkTeacherId(id){
        return request({
            url: `/zhaojiajiaoservice/er-caf/checkTeacher/${id}`,
            method: 'get',
        })
    },
    // 驳回
    uncheckTeacherId(id){
        return request({
            url: `/zhaojiajiaoservice/er-caf/uncheckTeacher/${id}`,
            method: 'get',
        })
    }

}
