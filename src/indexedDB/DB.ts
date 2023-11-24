interface DBStore {
   storeName:string,
   storeOptions:IDBObjectStoreParameters,
   indexOptions:object,
   indexArr:string[]
}

const DEFAULT_DB_STORE_OPTION:DBStore = {
    storeName:'test',
    storeOptions:{
        keyPath:'primaryKey',
        autoIncrement:true
    },
    indexArr:[],
    indexOptions:{}
}
/**
 * 打开浏览器中的indexedDB数据库
 * @param dbName {string} 数据库名称
 * @param dbStoreOptions {DBStore} 数据仓库options
 * @param version {number} 数据库版本（默认为1）
 * @return {IDBDatabase} 返回一个数据库实例
 */
export function openDB(dbName:string,dbStoreOptions:DBStore = DEFAULT_DB_STORE_OPTION,version:number = 1){
    return new Promise((resolve, reject) => {
        let indexedDB:IDBFactory = window.indexedDB
        let db;

        //打开数据库,没有数据库时会创建该数据库
        const request:IDBOpenDBRequest = indexedDB.open(dbName,version)

        //数据库打开成功回调
        request.onsuccess = function (e:any){
            db = e.target.result
            resolve({
                db,
                msg:'数据库打开成功'
            })
        }

        //数据库打开失败回调
        request.onerror = function (e:any){
            reject({
                e,
                msg:'数据库打开失败'
            })
        }

        //数据库更新时回调
        request.onupgradeneeded = function (e:any){
            //数据库创建或更新时会触发
            db = e.target.result
            const {storeName,storeOptions,indexArr,indexOptions} = dbStoreOptions
            createDBStore(db,storeName,storeOptions,indexArr,indexOptions)
        }

    })

}
function createDBStore(db:IDBDatabase,storeName:string,storeOptions:IDBObjectStoreParameters,indexArr:string[],indexOptions:object | any){
    let store:IDBObjectStore = db.createObjectStore(storeName,storeOptions)

    indexArr.forEach((item:any)=>{
        store.createIndex(item,item,{unique:indexOptions[item]})
    })
}

/**
 * 向indexedDB数据库中插入数据
 * @param db {IDBDatabase} 数据库实例
 * @param storeName {string} 仓库名称
 * @param data {Object} 要插入的数据（通常是一个对象，并且必须包含我们声明的索引键值对）
 */
export function insertDataToDB(db:IDBDatabase,storeName:string,data:object){
    let request:IDBRequest = db.transaction([storeName],'readwrite').objectStore(storeName).add(data)

    //数据写入成功
    request.onsuccess = function (e:any){
        console.log('数据库写入成功')
    }

    //数据写入失败
    request.onerror = function (e:any){
        console.log({
            e,
            msg:'数据写入失败'
        })
    }
}

/**
 * 通过主键来查询数据（只能查询出一条数据）
 * @param db {IDBDatabase} 数据库实例
 * @param storeName {string} 仓库名
 * @param primaryKey {string} 主键值（创建数据库时声明的keyPath）
 */
export function getDataByPrimaryKey(db:IDBDatabase,storeName:string,primaryKey:string){
    return new Promise((resolve, reject) => {
        let request:IDBRequest = db.transaction([storeName],"readonly").objectStore(storeName).get(primaryKey)

        request.onsuccess = function (e:any){
            resolve({
                e,
                msg:'通过主键读取成功'
            })
        }

        request.onerror = function (e:any){
            reject({
                e,
                msg:'事务失败'
            })
        }
    })
}

/**
 * 通过游标查询数据库的所有数据（该函数会开启一个游标，然后逐行读取数据并存入数组，最终获得仓库中的所有数据）
 * @param db {IDBDatabase} 数据库实例
 * @param storeName {string} 仓库名
 * @param withIndex {boolean} 是否根据游标和索引进行查询
 * @param indexName {string} 索引名
 * @param indexValue {any} 索引值
 */

export function getDataByCursorIndex(db:IDBDatabase,storeName:string,withIndex:boolean = false,indexName?:string,indexValue?:any){
    return new Promise(resolve => {
        let list:any[] = []
        let store:IDBObjectStore = db.transaction(storeName,"readonly").objectStore(storeName)

        //开启游标
        let request:IDBRequest = withIndex ? store.index(typeof indexName === 'string' ? indexName : '').openCursor(IDBKeyRange.only(indexValue)) : store.openCursor()

        request.onsuccess = function (e:any){
            let cursor = e.target.result
            if(cursor){
                list.push(cursor.value)

                //遍历对象中的所有内容
                cursor.continue()
            }
            else{
                resolve({
                    list,
                    msg:'游标读取的数据'
                })
            }
        }
    })
}

/**
 * 通过游标和索引删除数据
 * @param db {IDBDatabase} 数据库实例
 * @param storeName {string} 仓库名
 * @param indexName {string} 索引名
 * @param indexValue {any} 索引值
 */
export function deleteDataByCursorIndex(db:IDBDatabase, storeName:string, indexName:string, indexValue:any){
    return new Promise((resolve, reject) => {
        const store = db.transaction(storeName, "readwrite").objectStore(storeName);
        const request = store
            .index(indexName) // 索引对象
            .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
        request.onsuccess = function (e:any) {
            const cursor = e.target.result;
            let deleteRequest;
            if (cursor) {
                deleteRequest = cursor.delete(); // 请求删除当前项
                deleteRequest.onerror = function () {
                    reject({
                        e,
                        msg:"游标删除该记录失败"
                    });
                };
                deleteRequest.onsuccess = function () {
                    resolve({
                        e,
                        msg:"游标删除该记录成功"
                    });
                };
                cursor.continue();
            }
        };
        request.onerror = function (e:any) {
            reject({
                e,
                msg:"游标删除该记录失败"
            });
        };
    })
}

/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
export function deleteDBByPrimaryKey(db:IDBDatabase, storeName:string, id:string) {
    return new Promise((resolve, reject) => {
        const request:IDBRequest = db
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .delete(id);

        request.onsuccess = function (e:any) {
            resolve({
                e,
                msg:'数据删除成功'
            })
        };

        request.onerror = function (e:any) {
            reject({
                e,
                msg:'数据删除失败'
            })
        };
    })
}

/**
 * 更新数据（没有该数据时，会默认增加该条数据，可当作增加数据的方法）
 * @param db {IDBDatabase} 数据库实例
 * @param storeName {string} 仓库名
 * @param data {Object} 数据
 */
export function updateDB(db:IDBDatabase,storeName:string,data:object){
    return new Promise((resolve, reject) => {
        let request:IDBRequest = db.transaction([storeName],"readwrite").objectStore(storeName).put(data)

        request.onsuccess = function (e:any){
            resolve({
                e,
                msg:'数据更新成功'
            })
        }

        request.onerror = function (e:any){
            reject({
                e,
                msg:'数据更新失败'
            })
        }
    })
}

/**
 * 删除数据库
 * @param dbName {string} 数据库名
 * @param callback {Function} 回调
 */
export function deleteDB(dbName:string,callback:Function){
    let request:IDBRequest = window.indexedDB.deleteDatabase(dbName)

    request.onsuccess = function (e:any){
        callback(undefined,{result:'ok',msg:'数据库删除成功'})
    }

    request.onerror = function (e:any){
        callback({e,msg:'数据库删除失败'},undefined)
    }
}

/**
 * 关闭indexedDB数据库
 * @param db {IDBDatabase} 数据库实例
 */
export function closeDB(db:IDBDatabase){
    db.close()
}
