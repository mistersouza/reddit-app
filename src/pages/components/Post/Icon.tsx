import React from 'react'

import { Tab } from './PostForm'

type Props = {
    tab: Tab
}

const Icon = ({ tab }: Props) => {
    const { icon: IconComponent } = tab
    return <IconComponent { ...tab } />
}

export default Icon