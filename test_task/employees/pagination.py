from rest_framework.response import Response
from rest_framework import pagination


class CurrentPagePagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page_number': self.page.number,
            'results': data
        })
