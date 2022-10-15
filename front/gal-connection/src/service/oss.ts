import { OssFileType } from '../types/type'
import request from './request'

// 上传文件
export const uploadFile = (params: { body: FormData; query: OssFileType }) =>
  request.post<string>(
    `/api/Oss/Upload?ossFileType=${params.query}`,
    params.body
  )
