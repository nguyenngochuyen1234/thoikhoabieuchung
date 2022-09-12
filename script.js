var loader = document.getElementById("preloader")
window.addEventListener("load",()=>{
    loader.style.display = "none"
})


var arrayLesson = [
    {
        caHoc: 1,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 2,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 3,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 4,
        Thu: [[],[],[],[],[],[]]
        
    },
    {
        caHoc: 5,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 6,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 7,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 8,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 9,
        Thu: [[],[],[],[],[],[]]
    },
    {
        caHoc: 10,
        Thu: [[],[],[],[],[],[]]
    },
]
var uppdateArrayLesson = []
const btnRenderList = document.getElementById('btnRenderList');
const btnClose = document.getElementById('btnClose');
const Delete = document.getElementById('btnDelete');
const listContainer = document.getElementById('listContainer');
const deleteName = document.getElementById('deleteName');
const stringName = document.getElementById('name')
const stringDays = document.getElementById('day')
const stringHours = document.getElementById('hour')
const hours = document.querySelectorAll('#ca')
const listLi = document.getElementById("listLi")
var checkbox = document.getElementById("accept")
var sortArray
var inputs = [stringName, stringDays, stringHours]
var listSorte = ''
var arrayLessonApi = 'https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/publicApi'
function getArrayLessonApi(callback){
    fetch(arrayLessonApi)
    .then(function(response){
        return response.json()
    })
    .then(callback)
}
const currentPromise = new Promise(resolve =>{
    getArrayLessonApi(resolve)
})
//Render dữ liệu ban đầu
    currentPromise
        .then((apiData)=>{
            arrayLesson = [
                {
                    caHoc: 1,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 2,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 3,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 4,
                    Thu: [[],[],[],[],[],[]]
                    
                },
                {
                    caHoc: 5,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 6,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 7,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 8,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 9,
                    Thu: [[],[],[],[],[],[]]
                },
                {
                    caHoc: 10,
                    Thu: [[],[],[],[],[],[]]
                },
            ]
            apiData.forEach(object =>{
                updateApiInfor(object.name, object.days, object.hours, arrayLesson)
            })
            return arrayLesson;
        })
        .then((arrayLessonUpdate)=>{
            render(arrayLessonUpdate)
            renderListMember(arrayLesson)
            const listBlockName = document.querySelectorAll('.blockName')
            checkbox.addEventListener('click',()=>{
                ShowHideDiv(listBlockName)
            })
        })


//--------FUNCTION------
// Hàm submit
var getArrayHoursValue, stringNamesValue, getDaysValue, getHoursValue
function submit(callback){
    document.getElementById('myform').addEventListener('submit', function(e){
        e.preventDefault();
        getArrayHoursValue = []
        stringNamesValue = stringName.value
        getDaysValue = stringDays.value.trim().split(';')
        getHoursValue = stringHours.value.split(';')
        arrayHours = ''
        stringName.onchange = function(){
            stringNamesValue = stringName.value
        }
        stringDays.onchange = function(){
            getDaysValue = stringDays.value.split(';')
        }
        stringHours.onchange = function(){
            getHoursValue = stringHours.value.split(';')
        }
        getHoursValue.map(getHourValue =>{
            getArrayHoursValue.push(getHourValue.split('-'))
        })
        if(checkInput(stringNamesValue,getDaysValue,getArrayHoursValue)){
            const afterSubmit = new Promise(resolve=>{
                resolve({stringNamesValue,getDaysValue,getArrayHoursValue})
            })
            afterSubmit
                .then((dataSubmit)=>{
                    var formData = 
                    {
                        name: dataSubmit.stringNamesValue,
                        days: dataSubmit.getDaysValue,
                        hours: dataSubmit.getArrayHoursValue,
                    }
                    return formData
                })
                .then((formData)=>{
                    CreateInfor(formData)
                })
                callback(arrayLesson)
        }
        else{
            alert("Nhập lỗi!, Vui lòng nhập lại")
            inputs.forEach(input=>{
                input.value = ''
            })
        }

        
        });
    }
    function getArrayLessonAfterSubmit(arrayLesson){
        const currentPromise1 = new Promise(resolve=>{
            getArrayLessonApi(resolve)
        })
        currentPromise1
        .then(data=>{
                data.forEach(object=>{
                    updateApiInfor(object.name, object.days, object.hours, arrayLesson)
                    location.reload(true)
                })
            })
    }
    submit(getArrayLessonAfterSubmit)
//Hàm render
function render(arrayLesson){
    var arrayHours = ''
    hours.forEach((hour,index)=>{
        sortArray = []
        arrayHours = `<td>${index+1}</td>`
        arrayLesson[index].Thu.forEach(names=>{
            var arrayNames = ''
            names.length >= 4 && sortArray.push(names.length)
            names.forEach(name=>{arrayNames +=`<li class="blockName">${name}</li>`})
            var styleValue = names.length>3 ? `rgba(255, 30, 9,0.${names.length>=10?9:names.length});`:"#E8E8E8"
            arrayHours+=(names.length>0 ? `<td style="background-color: ${styleValue};"><span>${names.length}</span>${arrayNames}</td>`:`<td></td>`) 
            })
            
        hour.innerHTML = arrayHours
        }
    )
}
// hàm cập nhật dữ liệu của mảng
function updateApiInfor(stringNamesValue,getDaysValue,getArrayHoursValue,arrayLesson){
    for(let i = 0;i<getArrayHoursValue.length;i++){
        getArrayHoursValue[i].forEach((everyHours) =>{
            arrayLesson.forEach(lesson=>{
                if((isNaN(parseInt(getDaysValue[i]))===false)&&checkInput(stringNamesValue,getDaysValue,getArrayHoursValue)){
                    lesson.caHoc===parseInt(everyHours)?{...lesson,Thu: lesson.Thu[parseInt(getDaysValue[i])-2].push(stringNamesValue)}:lesson
                }
            })
        })
    }
    inputs.forEach(input=>{
        input.value = ''
    })
}
function renderListMember(arrayLesson){
    listSorte = ''
    for(let i = 0;i<10;i++){
        arrayLesson[i].Thu.forEach((names)=>{
            names.length > 3 && sortArray.push(names.length)
        })
    }    
    for (sorted of sortedArray(sortArray)){
        for(let i = 0;i<10;i++){
            arrayLesson[i].Thu.forEach((names,index)=>{
                listSorte += sorted === names.length ? `<li>Thứ: ${index+2} Ca: ${i+1} Số thành viên: ${sorted}</li>` : ``
            })
        }
    }        
//Render danh sachs thành viên
    listLi.innerHTML = listSorte
}
//check nhập lỗi
function checkInput(stringNamesValue,getDaysValue, getArrayHoursValue){
    console.log({ getDaysValue, getArrayHoursValue})
    let testLenght = (getDaysValue.length === getArrayHoursValue.length || undefined)
    // let testlimit = (getDaysValue.trim() != '' && getArrayHoursValue.trim() != '') || undefined
    let testLimitDays = 1
    let testLimitHours = 1
    getDaysValue.forEach(day=>{
        (parseInt(day) > 7 || parseInt(day) < 2) && (testLimitDays = undefined) 
    })
    getArrayHoursValue.forEach(hours=>{
        hours.forEach(hour=>{
            (parseInt(hour) > 10 || parseInt(hour) < 1) && (testLimitHours = undefined) 
        })
    })
    return testLenght && testLimitDays && testLimitHours && stringNamesValue
    
}
// Hàm post api
    function CreateInfor(data) 
    {
        var options = {
            method: 'POST',
            body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        };
        fetch(arrayLessonApi, options)
        .then((respose) => 
        {
            respose.json();
        })
    }
//Delete
    Delete.addEventListener('click',(e)=>{
        e.preventDefault();
        const promiseDelete = new Promise(resolve=>{
            resolve(document.getElementById('deleteName').value)
        })
        promiseDelete
        .then(name=>{
            const getAPItoDelete = new Promise(resolve=>{
                getArrayLessonApi(resolve)
            })
            getAPItoDelete
                .then((api)=>{
                    api.forEach(object=>{
                        if(object.name===name){
                            handleDeleteName(object.id)
                        }
                    })
                })
        })
        deleteName.value = ''
    })
//Loại bỏ số trùng nhau và sắp xếp theo thứ tự
function sortedArray(array){
    array.sort((a, b) => b - a);
    mySet = new Set(array)
    return mySet
}
//hiện danh sách
btnRenderList.addEventListener('click',()=>{
    listContainer.classList.add('show')
})
//Ẩn danh sách
btnClose.addEventListener('click',()=>{
    listContainer.classList.remove('show')
})
// Xóa tên
function handleDeleteName(id) 
{
    var options = {
        method: 'DELETE',
        headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(arrayLessonApi+ `/${id}`, options)
    .then(()=>{
        location.reload()
    })
}
function ShowHideDiv(list) {
    list.forEach(item=>{
        item.style.display = checkbox.checked ? "inline-block" : "none";
    })
}
