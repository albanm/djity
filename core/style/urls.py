from django.conf.urls.defaults import *

urlpatterns = patterns('djity.core.style.views',
        url('texture','texture',name='texture'),
        url('icons','icons',name='icons'),
        url('themeroller.html','themeroller',name="themeroller"),
        url('ui.css','css',{'template':'core/style/jquery-ui.css'},name="ui_css"),
        url('project.css','css',{'template':'core/style/project.css'},name="project_css"), 
        url('^(?P<template>[-\w]+)','css',name="generic_css"),
)
# place app url patterns here
