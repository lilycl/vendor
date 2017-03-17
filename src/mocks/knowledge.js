
module.exports = {
  'test': {
    list: [
      {
        "id": "1",
        "description": "测试1", //knowledge name
        "type": "1", //ordinary is 0, contest is 1, default 0,<br/>
        "createTime": "1111", //this obj create time, default 1970-01-01 00:00:00
        "lastEditTime": "", //last modified time, default 1970-01-01 00:00:00
        "lastEditor": "", //last modified user id ,admin is -1
        "parentDirId": "", //belonging one dirprivate Map<Integer,Integer> 
        "directories": "", //dir<systemId, dirId>
        //以下对象引用 实际字段在各自restful resource中详细描述
        "topicModels": [{}], //topic models 
        "deleted": 0 //默认0，已删除为1
      },{
        "id": "2",
        "description": "测试2", //knowledge name
        "type": "2", //ordinary is 0, contest is 2, default 0,<br/>
        "createTime": "2", //this obj create time, default 2970-02-02 00:00:00
        "lastEditTime": "", //last modified time, default 2970-02-02 00:00:00
        "lastEditor": "", //last modified user id ,admin is -2
        "parentDirId": "", //belonging one dirprivate Map<Integer,Integer> 
        "directories": "", //dir<systemId, dirId>
        //以下对象引用 实际字段在各自restful resource中详细描述
        "topicModels": [{}], //topic models 
        "deleted": 0 //默认0，已删除为2
      },{
        "id": "3",
        "description": "测试3", //knowledge name
        "type": "3", //ordinary is 0, contest is 3, default 0,<br/>
        "createTime": "3", //this obj create time, default 1970-01-01 00:00:00
        "lastEditTime": "", //last modified time, default 1970-01-01 00:00:00
        "lastEditor": "", //last modified user id ,admin is -1
        "parentDirId": "", //belonging one dirprivate Map<Integer,Integer> 
        "directories": "", //dir<systemId, dirId>
        //以下对象引用 实际字段在各自restful resource中详细描述
        "topicModels": [{}], //topic models 
        "deleted": 0 //默认0，已删除为1
      },{
        "id": "4",
        "description": "测试3", //knowledge name
        "type": "4", //ordinary is 0, contest is 3, default 0,<br/>
        "createTime": "3", //this obj create time, default 1970-01-01 00:00:00
        "lastEditTime": "", //last modified time, default 1970-01-01 00:00:00
        "lastEditor": "", //last modified user id ,admin is -1
        "parentDirId": "", //belonging one dirprivate Map<Integer,Integer> 
        "directories": "", //dir<systemId, dirId>
        //以下对象引用 实际字段在各自restful resource中详细描述
        "topicModels": [{}], //topic models 
        "deleted": 0 //默认0，已删除为1
      }
    ]
  }
}