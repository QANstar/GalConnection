import { IFile, IGroup } from '../types/type'
import request from './request'

// 用户加入的组
export const getGroupOfUser = () =>
  request.get<IGroup[]>('/api/Material/GetGroupOfUser')

// 获取指定文件夹下所有文件夹
export const getFoldersByPid = (params: { groupId: number; pid: number }) =>
  request.get<IFile[]>(
    `/api/Material/GetFoldersByPid?groupId=${params.groupId}&pid=${params.pid}`
  )
