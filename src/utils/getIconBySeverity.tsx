import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle } from 'react-icons/fi'

export const getIconBySeverity = (severity?: string) => {
  switch (severity) {
    case 'success':
      return FiCheckCircle
    case 'warning':
      return FiAlertCircle
    case 'info':
      return FiInfo
    case 'error':
      return FiXCircle
    default:
      return FiInfo
  }
}
