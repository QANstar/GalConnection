import {
  FilterFileTye,
  ICreateFile,
  ICreateFolder,
  IFile,
  IFolderInfo,
  IGroup,
  IRename
} from '../types/type'
import request from './request'

// 用户加入的组
export const getGroupOfUser = () =>
  request.get<IGroup[]>('/api/Material/GetGroupOfUser')

// 获取指定文件夹下所有文件夹
export const getFoldersByPid = (params: { groupId: number; pid: number }) =>
  request.get<IFile[]>(
    `/api/Material/GetFoldersByPid?groupId=${params.groupId}&pid=${params.pid}`
  )

// 获取指定文件夹下的所有文件
export const getFiles = (params: { groupId: number; pid: number }) =>
  request.get<IFile[]>(
    `/api/Material/GetFiles?groupId=${params.groupId}&pid=${params.pid}`
  )

// 根据类型获取指定文件夹下的所有文件
export const getFilesByType = (params: {
  groupId: number
  pid: number
  type: FilterFileTye
}) =>
  request.get<IFile[]>(
    `/api/Material/GetFilesByType?groupId=${params.groupId}&pid=${params.pid}&type=${params.type}`
  )

// 创建文件夹
export const createFolder = (params: ICreateFolder) =>
  request.post<number>('/api/Material/CreateFolder', params)

// 创建文件
export const createFile = (params: ICreateFile) =>
  request.post<number>('/api/Material/CreateFile', params)

// 获取文件url
export const getFileUrl = (params: { groupId: number; fileId: number }) =>
  request.get<string>(
    `/api/Material/GetUrl?groupId=${params.groupId}&fileId=${params.fileId}`
  )

// 获取文件夹信息
export const getFolderInfo = (params: { groupId: number; fileId: number }) =>
  request.get<IFolderInfo>(
    `/api/Material/GetFolderInfo?groupId=${params.groupId}&fileId=${params.fileId}`
  )
// 删除文件
export const delFile = (fileId: number) =>
  request.post<string>(`/api/Material/DelFile?fileId=${fileId}`)

// 重命名
export const rename = (params: IRename) =>
  request.post<number>('/api/Material/ReName', params)
