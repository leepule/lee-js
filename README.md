## 登录

#### 接口URL

> {{local_url}}/login

#### 请求方式

> POST

#### Content-Type

> form-data






#### 请求Body参数

| 参数     | 示例值   | 是否必填 | 参数描述       |
| :------- | :------- | :------- | :------------- |
| username | admin    | 必填     | 用户名         |
| password | MTIzNDU2 | 必填     | 需要base64加密 |

#### 成功响应示例

```javascript
{
	"msg": "success",
	"ssjgmc": "福泉农商行",
	"code": 1,
	"xm": "admin",
	"rybh": "0",
	"roleList": [
		{
			"roleid": "role0002",
			"rolename": "系统管理员"
		},
		{
			"roleid": "role0019",
			"rolename": "一般人员"
		}
	],
	"token": "ZXlKaGJHY2lPaUpCUlZNaUxDSjBlWEFpT2lKS1YxUWlmUT09DQouZXlKbGVIQWlPaUl6TUNJc0ltVjRjRVJoZEdFaU9uc2lZV05qZEdsa0lqb2lZV05qZERBd01EQXdNU0lzSW01aGJXVWlPaUpoWkcxcA0KYmlJc0luSjVZbWdpT2lJd0lpd2ljbmxwWkNJNkluSjVNREF3TURBd01ERWlmU3dpYVdGMElqb2lNVFl3T0RJM05ERTFPVGN4TXlJcw0KSW1semN5STZJbk5zYTJvaWZRPT0NCi5ZM053YVVZdmQweG9aa0ZLY1ZNeGQweDVOMU5KWVZKSVRYRnJZbWt2Y1dkbFMxcHJPRmxPWldWTU4xRnlNV2hLUm1KM2Fpc3hVMEpFDQpXWEpRUlRNd0sxcFlWeXRJUW5ZNU9USXllUTBLYjBRd2VrWXhlRk14UVQwOURRbz0NCg=="
}
```

| 参数     | 示例值                                    | 参数描述                                                     |
| :------- | :---------------------------------------- | :----------------------------------------------------------- |
| roleList | [{},{}]                                   | 角色List                                                     |
| token    | “ZXlKaGJHY2lPaUpCUlZNaUxDSjBlWEFpT2l....” | 需要登录接口token参数（header传参：token+{登录返回的token}） |
| xm       | admin                                     | 姓名                                                         |
| rybh     | 0                                         | 人员编号                                                     |
| ssjgmc   | 福泉农商行                                | 所属机构名称                                                 |


## 修改密码

无实际业务，现用于测试

#### 接口URL

> {{local_url}}/updatePwd

#### 请求方式

> POST

#### Content-Type

> form-data





#### 请求Header参数

| 参数  | 示例值             | 是否必填 | 参数描述                |
| :---- | :----------------- | :------- | :---------------------- |
| token | token{{token_var}} | 必填     | token+{登录返回的token} |

#### 请求Body参数

| 参数        | 示例值   | 是否必填 | 参数描述 |
| :---------- | :------- | :------- | :------- |
| oldPassword | MTIzNDU2 | 必填     | 旧密码   |
| newPassword | MTIzNDU2 | 必填     | 新密码   |
| repPassword | MTIzNDU2 | 必填     | 重复密码 |

#### 成功响应示例

```javascript
{
	"msg": "密码修改成功",
	"code": 1,
	"token": "ZXlKaGJHY2lPaUpCUlZNaUxDSjBlWEFpT2lKS1YxUWlmUT09DQouZXlKbGVIQWlPaUl6TUNJc0ltVjRjRVJoZEdFaU9uc2lZV05qZEdsa0lqb2lZV05qZERBd01EQXdNU0lzSW1GalkzUnVZVzFsSWpvaQ0KWVdSdGFXNGlMQ0poWkcxcGJpSTZkSEoxWlN3aVkycHllU0k2SW1Ga2JXbHVJaXdpWTJweWVXbGtJam9pWVdOamREQXdNREF3TVNJcw0KSW1WdFlXbHNJam9pSUNJc0ltaGhibVJ3YUc5dVpTSTZJaUFpTENKb2IyMWxjSEp2SWpvaUlDSXNJbkIzWkNJNklqWmxaR1k1WlRZNA0KTUdZeE1EZGxaVFEyWmpFNE5UUm1ZMkZqTWpOaE16QmpNVFV5TVdVNU1tSTVPVGczWXpZeVpXWmhNRFZqTjJabElpd2ljbmxpYUNJNg0KSWpBaUxDSnllV2xrSWpvaWNua3dNREF3TURBd01TSXNJbnBvZW5SaWJTSTZJakVpTENKNmFuaG5jbkVpT2pFMk1EZ3hOVFV5TmpBdw0KTURBc0lucHFlR2R5ZVNJNklqQWlMQ0o2YW5obmNubHBaQ0k2SW1GalkzUXdNREF3TURFaWZTd2lhV0YwSWpvaU1UWXdPREkxTmpjeg0KT0Rjd09TSXNJbWx6Y3lJNkluTnNhMm9pZlE9PQ0KLlRtUmFPVFoxVURaaWMwdDJjRVJMV0VveE55dG5OaTlXUkZCc05tNXhXbE55WjBSdVMwWkRWVE5aYlc5bVRYaDFjVGRGV1ZOMFZrMW4NClREQkhPVVZITkhCaVVHTmpMMnBDYVROQ2RBMEthU3MwWkdKcVJqaExkejA5RFFvPQ0K"
}
```

| 参数  | 示例值                                            | 参数描述                |
| :---- | :------------------------------------------------ | :---------------------- |
| code  | 1                                                 | 状态标志：1-成功 0-失败 |
| token | "ZXlKaGJHY2lPaUpCUlZNaUxDSjBlWEFpT2lKS1YxUWlm..." | 密码修改后的token       |


## 刷新token

无实际业务，现用于测试

#### 接口URL

> {{local_url}}/parseToken

#### 请求方式

> POST

#### Content-Type

> form-data





#### 请求Header参数

| 参数  | 示例值             | 是否必填 | 参数描述                |
| :---- | :----------------- | :------- | :---------------------- |
| token | token{{token_var}} | 必填     | token+{登录返回的token} |




## 业绩排名列表

#### 接口URL

> {{local_url}}/yjpm/getList

#### 请求方式

> POST

#### Content-Type

> form-data





#### 请求Header参数

| 参数  | 示例值             | 是否必填 | 参数描述                |
| :---- | :----------------- | :------- | :---------------------- |
| token | token{{token_var}} | 必填     | token+{登录返回的token} |

#### 请求Body参数

| 参数   | 示例值 | 是否必填 | 参数描述                                 |
| :----- | :----- | :------- | :--------------------------------------- |
| ywlx   | 1      | 必填     | 业务类型：1-存款年日均，2-贷款年日均     |
| khgwbh | 2016   | 必填     | 考核岗位编号（取至考核岗位接口-dmz字段） |

#### 成功响应示例

```javascript
{
	"msg": "success",
	"code": 1,
	"khgw": [
		{
			"RYBH": "XN2440001",
			"MCNUM": 1,
			"XM": "营业部虚拟户",
			"CKNRJ": 1154030192.119986,
			"KHGW": "0000"
		},
		{
			"RYBH": "XN2440003",
			"MCNUM": 2,
			"XM": "城厢支行虚拟户",
			"CKNRJ": 507288859.110017,
			"KHGW": "0000"
		},
		{
			"RYBH": "XN2440014",
			"MCNUM": 3,
			"XM": "牛场支行虚拟户",
			"CKNRJ": 377807834.530036,
			"KHGW": "0000"
		}
	]
}
```

| 参数  | 示例值       | 参数描述   |
| :---- | :----------- | :--------- |
| MCNUM | 1            | 排名       |
| CKNRJ | 100.0001     | 金额（元） |
| RYBH  | XN2440001    | 人员编号   |
| XM    | 营业部虚拟户 | 姓名       |
| KHGW  | 0000         | 考核岗位   |


## 绩效排名列表

无实际业务，现用于测试

#### 接口URL

> {{local_url}}/jxpm/getlist

#### 请求方式

> POST

#### Content-Type

> form-data





#### 请求Header参数

| 参数  | 示例值             | 是否必填 | 参数描述                |
| :---- | :----------------- | :------- | :---------------------- |
| token | token{{token_var}} | 必填     | token+{登录返回的token} |




## 考核岗位

进入业务排名、绩效排名菜单需要获取的列表

#### 接口URL

> {{local_url}}/common/getKhgw

#### 请求方式

> POST

#### Content-Type

> form-data





#### 请求Header参数

| 参数  | 示例值             | 是否必填 | 参数描述 |
| :---- | :----------------- | :------- | :------- |
| token | token{{token_var}} | 必填     | -        |


#### 成功响应示例

```javascript
{
	"msg": "success",
	"code": 1,
	"khgw": [
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2018",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2018",
			"dmz": "综合柜员",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2016",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2016",
			"dmz": "客户经理",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2011",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2011",
			"dmz": "主办会计",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2010",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2010",
			"dmz": "支行行长（管理）",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18",
			"updateById": "acct000001",
			"updateByName": "admin",
			"updateDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2031",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2031",
			"dmz": "支行副行长（管理）",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2032",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2032",
			"dmz": "支行行长（经营）",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2034",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2034",
			"dmz": "网点负责人",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		},
		{
			"searchFromPage": false,
			"dmid": "KHGWSZ2009",
			"dmlbbm": "KHGWSZ",
			"dmbm": "2009",
			"dmz": "总出纳",
			"sfkwh": "1",
			"sfyx": "1",
			"createById": "acct000001",
			"createByName": "admin",
			"createDate": "2020-12-18"
		}
	]
}
```

| 参数 | 示例值   | 参数描述                         |
| :--- | :------- | :------------------------------- |
| khgw | [{},{}]  | 考核岗位List                     |
| dmbm | 2018     | 考核岗位代码编号（后续接口需要） |
| dmz  | 综合柜员 | 考核岗位代码值                   |

