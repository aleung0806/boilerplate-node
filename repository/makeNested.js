const projectGet = (arr) => {

  console.log('in make nested...', arr  )
  if (arr[0].projectId === null){
    return []
  }

  let project = {
    id: arr[0].projectId,
    title: arr[0].projectTitle,
    role: arr[0].role,
    lists: []
  }

let lists = []
for (let i = 0; i < arr.length; i++){
  let e = arr[i]

  if (e.listId !== null && (i == 0 || e.listId !== arr[i-1].listId)){
    let list = {
      id: e.listId,
      projectId: e.projectId,
      title: e.listTitle,
      issueOrder: e.issueOrder,
      issues: []
    }
    console.log('----list', list)

    lists.push(list)
  }
}

let issues = {}
for (let i = 0; i < arr.length; i++){
  let e = arr[i]

  if (e.issueId !== null){
    let issue = {
      id: e.issueId,
      listId: e.listId,
      projectId: e.projectId,
      title: e.issueTitle
    }

    issues[issue.id] = issue
  }
}

console.log('issues', issues)

for (let i = 0; i < lists.length; i++){
  let list = lists[i]
  if (list.issueOrder !== null){
    for (let j = 0; j < list.issueOrder.length; j++){
      let issueId = list.issueOrder[j]
      console.log('issueId', issueId)
      list.issues.push(issues[issueId])
    }
  }
  project.lists.push(list)

}

  // console.log(JSON.stringify(project, null, 2))
  return project
}

const userGet = (arr) => {
 
}


module.exports = {
  projectGet,
  userGet
}