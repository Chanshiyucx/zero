import 'react-photo-view/dist/react-photo-view.css'
import type { PhotoProviderBase } from 'react-photo-view/dist/types'
import { Spinner } from '@/components/ui/spinner'

// maybe hide the toolbar is better. ( ˘▽˘)っ♨
// import { Toolbar } from './Toolbar'

export { PhotoProvider, PhotoView } from 'react-photo-view'

export const photoViewConfig: PhotoProviderBase = {
  maskOpacity: 1,
  maskClassName: 'photo-view-mask',
  bannerVisible: false,
  photoClosable: true,
  pullClosable: true,
  loadingElement: <Spinner size="large" />,
  // toolbarRender: (props) => <Toolbar {...props} />,
}
