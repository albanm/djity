from django.conf.urls.defaults import *

from django.contrib import admin
admin.autodiscover()

from dajaxice.core import dajaxice_autodiscover
dajaxice_autodiscover()

from django.conf import settings

from djity.portal.urls import urlpatterns as portal_urls

urlpatterns = patterns('',
	(r'^site_media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),

	(r'^localeurl/', include('localeurl.urls')),

    (r'^comments/', include('django.contrib.comments.urls')),

	(r'^%s/' % settings.DAJAXICE_MEDIA_PREFIX, include('dajaxice.urls')),

	# Uncomment the next line to enable the admin:
	(r'^admin/', include(admin.site.urls)),
    #login page
    (r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'core/portal/login.html'}),

	# urls that didn't match are all
	# handled by djity.portal
	(r'^',include(portal_urls)),

)
