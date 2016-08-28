# Rationale

The `CollectionHelper` is a proposed solution to how we should resolve the
sort, filter, and paging issues in Marionette.

## Marionette Issues

The development of Marionette 2.x and 3.0 uncovered, and continues to uncover,
numerous issues with the `sort` and `filter` methods on `CollectionView`. These
included:

1. Numerous conflicts between the two.
2. Performance issues.
3. Issues keeping the DOM up-to-date with the sort/filter status.
4. Ignores `Backbone.Collection` `sort` and `filter` methods.

### Why Not Collection?

While the `CollectionView` will respect `sort` on a `Collection`, there is no
clean way to `filter` a collection without removing models from it. While this
works fine if the collection is managed server-side, it doesn't work at all when
we want to manage a client-side collection quickly.

In addition, if we share a collection between two `CollectionView` instances, we
might not want to filter or sort them in tandem. The user may not expect this
behavior and it may cause unnecessary rendering to be performed.

### Why Collection?

Despite these downsides, the `Collection` does include a well-understood sorting
implementation and has plenty of methods for actually filtering collections. We
should utilize this existing codebase where we can and build on-top of them in a
way that makes sense for Marionette.

On the Marionette side, the `CollectionView` is perfectly capable of smartly
rendering changes to the attached collection. If we improve the implementation
of collection, we should be able to get even more performance from the current
implementation. If we remove the `filter` and `sort` implementations from the
`CollectionView` then we no longer have to account for this internal state.

## Proposal

My proposed solution is to use a form of intermediary `Collection` that
maintains sorting and filtering state. It will need to proxy all its matching
collection events through to the listening view. It will also need to cleanly
manage the collection's state.

## Inspiration

The idea behind this implementation comes from
[Django REST Framework Filters][drf-filter] and how they get attached to the
`ViewSet` separately from the `queryset` or `get_queryset` handlers.

This clean separation means developers can set a base `get_queryset` that
manages the filters that the view will always apply e.g. restricting data to
that owned by the current user. The view can then provide filter fields that the
user can optionally apply to a `QuerySet` after it has been prepared. Django
REST Framework will then manage how to apply these filters. It also provides
backends for automatically sorting and passing sorting parameters for the user
to request.

In a separate topic, paging is designed in a similar way - a separate paging
class that gets attached to a `ViewSet` that cleanly separates paging from the
querying, filtering, and sorting logic.

[drf]: http://www.django-rest-framework.org/api-guide/filtering/
