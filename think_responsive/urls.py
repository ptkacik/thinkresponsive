import os
from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from django.views.generic import (
    TemplateView
)


class PartialsRenderer(TemplateView):
    def get_template_names(self, *args, **kwargs):
        path = self.kwargs.get('path')
        return ["partials/%s" % path, ]


urlpatterns = patterns('',
    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # Django email registration
    #url(r'^accounts/', include('registration_email.backends.default.urls')),
    url(r'^partials/(?P<path>.*)$', PartialsRenderer.as_view(), name="partial_renderer"),

    url(r'^robots\.txt$', TemplateView.as_view(
        template_name="robots.txt",
        content_type="text/plain"),
    ),

    url(r'^$', include('apps.frontend.urls')),
)

if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    # static files
    urlpatterns += staticfiles_urlpatterns()
    # media files
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
    )
