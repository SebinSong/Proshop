import React from 'react'

import Icon from './icon/Icon.js'
import Container from './container/Container.js'
import Mq from './media-query/Mq.js'
import PageTemplate from './page-template/PageTemplate.js'
import ProtectedPage from './ProtectedPage.js'
import LoaderSpinner from './loader-spinner/LoaderSpinner.js'

React.Global = {
  Icon,
  Container,
  Mq,
  PageTemplate,
  ProtectedPage,
  LoaderSpinner
}
