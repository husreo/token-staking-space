'use client'
import * as React from 'react'
import { Next13ProgressBar } from 'next13-progressbar'

const customCss = '#nprogress .bar{background:#00FFC2;position:fixed;z-index:9999 !important;top:0;left:0;width:100%;height:4px}'

const ProgressBarContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      {children}
      <Next13ProgressBar
        options={{ showSpinner: false }}
        showOnShallow
        style={customCss}
      />
    </React.Fragment>
  )
}

export default ProgressBarContext
