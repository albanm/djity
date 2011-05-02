# vim: tabstop=4 expandtab shiftwidth=4 softtabstop=4
from django.http import HttpResponse,HttpResponseNotFound,HttpResponseNotAllowed, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth import logout as logout_response

from djity.utils.decorators import djity_view 


@djity_view()
def overview(request,project='root',context=None):
    """
    Render the Homepage of a Djity site
    """

    # Return project overview template
    return render_to_response('djity/project/overview.html',context)

def logout(request):
    next_page = '/'
    if request.method == 'GET':
        next_page = request.GET.get('next_page',next_page)
    if request.method == 'POST':
        next_page = request.POST.get('next_page',next_page)
    
    response = logout_response(request, next_page=nex_page)
    response.delete_cookie('user_location')
    return response


@djity_view()
def login(request,context):
    context['next_page'] = request.GET['next']
    context['onload'] = "dj.widgets.login.open();"
    context['no_right_tabs'] = True
    return render_to_response('djity/project/account.html',context)


@djity_view()
def first_tab(request,context):
    """
    Redirect the default view of a project to the first tab's view of the project.
    """
    modules = context['modules']
    if len(modules) > 0:
        return HttpResponseRedirect(modules[0].djity_url(context))


