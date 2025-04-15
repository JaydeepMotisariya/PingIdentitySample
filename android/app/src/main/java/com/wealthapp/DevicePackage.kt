package com.wealthapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * DevicePackage is a ReactPackage that provides the bridge between the native and JavaScript
 * modules.
 */
class DevicePackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        //We import the module file here
        modules.add(FRAuthSampleBridge(reactContext))

        return modules
    }

    // Backward compatibility
    fun createJSModules(): List<Class<out JavaScriptModule?>> {
        return ArrayList()
    }
}
